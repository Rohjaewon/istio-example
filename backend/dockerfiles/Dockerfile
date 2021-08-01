FROM golang:1.16-alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64
   
WORKDIR /builder

COPY . .

RUN go mod download
RUN go build -o /app ./cmd/main.go

FROM scratch

COPY --from=builder /app /

WORKDIR /

ENTRYPOINT [ "./app" ]
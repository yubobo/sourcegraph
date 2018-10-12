#!/bin/bash
set -e
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

export GOBIN="$PWD/.bin"
export PATH=$GOBIN:$PATH
export GO111MODULE=on

go install honnef.co/go/tools/cmd/staticcheck

echo go install...
go install -buildmode=archive ./...

echo go vet...
go vet ./...

echo staticcheck...
staticcheck -ignore '*:ST*' ./...

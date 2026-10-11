#!/bin/sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
FOOTER_FILE="$ROOT_DIR/components/footer.tsx"
COMMIT_HASH=$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || printf 'dev')

COMMIT_HASH="$COMMIT_HASH" perl -0pi -e \
	"s|(id=\"commit-hash\"\\s*>).*?(</span>)|\$1\$ENV{COMMIT_HASH}\$2|s" \
	"$FOOTER_FILE"

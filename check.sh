#!/usr/bin/env bash
# Coco y Mango publish preflight. Every story shown on the site MUST have both a
# JSON file and an illustration, and index.html's story count must match what's
# on disk. Run before every commit/push. Exits non-zero (loudly) on any problem.
#
#   ./check.sh
#
set -euo pipefail
cd "$(dirname "$0")"

fail=0

count=$(grep -oE 'length: [0-9]+' index.html | head -1 | grep -oE '[0-9]+' || true)
if [ -z "$count" ]; then
  echo "ERROR: could not read the STORIES 'length: N' value from index.html"
  exit 1
fi
echo "index.html declares $count stories. Verifying every story has a JSON file + an image..."

for i in $(seq 1 "$count"); do
  n=$(printf '%02d' "$i")
  json="historias/historia${n}.json"
  img="imagenes/imagen${n}.png"
  [ -f "$json" ] || { echo "  MISSING STORY:  $json"; fail=1; }
  [ -f "$img" ]  || { echo "  MISSING IMAGE:  $img  <-- story would render cartoonless"; fail=1; }
done

# Orphan stories on disk beyond the declared count never display (silent drop).
for json in historias/historia*.json; do
  num=$(basename "$json" | grep -oE '[0-9]+')
  if [ "$((10#$num))" -gt "$count" ]; then
    echo "  ORPHAN STORY (won't show; index count is $count): $json"; fail=1
  fi
done

if [ "$fail" -ne 0 ]; then
  echo ""
  echo "PREFLIGHT FAILED. Do NOT publish: every story needs a JSON + image and the count must match."
  exit 1
fi

echo "OK: all $count stories have a JSON file and an illustration."

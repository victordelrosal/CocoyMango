#!/bin/bash
#
# AMAF v3.0.0 - Ralph Edition
# Coco y Mango Games - Batch 2 (Games 7-10)
#

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

cat << 'BANNER'

    ____        __      __
   / __ \____ _/ /___  / /_
  / /_/ / __ `/ / __ \/ __ \
 / _, _/ /_/ / / /_/ / / / /
/_/ |_|\__,_/_/ .___/_/ /_/
             /_/
   AMAF v3.0.0 - Trust the Loop

BANNER

echo "  Project: Coco y Mango Games (Final Batch)"
echo "  Path:    $PROJECT_ROOT"
echo "  Prompt:  PROMPT.md"
echo "  PRD:     PRD.json"
echo ""
echo "  Games:   11 (San Patricio), 12 (Aeropuerto), 13 (Boleto)"
echo ""
echo "  Press Ctrl+C to stop Ralph."
echo ""

while :; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Ralph cycle starting..." | tee -a ralph.log
    claude -p "$(cat PROMPT.md)" --dangerously-skip-permissions
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Ralph cycle ended" | tee -a ralph.log

    if [ -f "DONE.md" ]; then
        echo ""
        echo "  ✓ RALPH COMPLETE!"
        echo ""
        cat DONE.md
        exit 0
    fi

    sleep 2
done

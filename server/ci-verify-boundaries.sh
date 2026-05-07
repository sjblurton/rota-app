#!/bin/sh
set -e

# Print working directory and list boundaries config files
pwd
ls -l eslint/boundaries/

# Print the contents of elements.mjs
cat eslint/boundaries/elements.mjs

# Print the first 20 lines of eslint.config.mjs
head -20 eslint.config.mjs

# Print the boundariesElements variable definition
awk '/export const boundariesElements = \[/, /\]/ { print }' eslint/boundaries/elements.mjs

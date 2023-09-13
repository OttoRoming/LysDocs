#!/bin/bash
#


for file in $(find . -name "*.md")
do
	echo -e " " > $file
done

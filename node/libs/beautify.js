#!/bin/bash

set -e

install_js_beautify() {
    if ! command -v js-beautify &> /dev/null; then
        echo "Installing js-beautify..."
        yay -S --noconfirm js-beautify
    else
        echo "js-beautify is already installed."
    fi
}

main() {
    install_js_beautify
    echo "Excellent."
}

main

exit 0

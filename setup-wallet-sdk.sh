#!/bin/bash

set -ex

REPO_URL="git@github.com:dapplink-labs/wallet-sdk.git"
# BRANCH="main"
BRANCH="dexco"
LIB_DIR="lib"
TARGET_DIR="$LIB_DIR/wallet-sdk"

echo "Current working directory: $(pwd)"

# 确保 lib 目录存在
if [ ! -d "$LIB_DIR" ]; then
    echo "Creating $LIB_DIR directory..."
    mkdir -p "$LIB_DIR"
fi

if [ -d "$TARGET_DIR" ]; then
    echo "Directory $TARGET_DIR already exists."
    if [ -d "$TARGET_DIR/.git" ]; then
        echo "Updating existing repository..."
        cd "$TARGET_DIR"
        git fetch
        git checkout "$BRANCH"
        git pull origin "$BRANCH"
        cd -
    else
        echo "Directory exists but is not a git repository. Removing and cloning..."
        rm -rf "$TARGET_DIR"
        git clone -b "$BRANCH" "$REPO_URL" "$TARGET_DIR"
    fi
else
    echo "Cloning repository..."
    git clone -b "$BRANCH" "$REPO_URL" "$TARGET_DIR"
fi

echo "wallet-sdk setup completed."

# 检查 wallet-sdk 目录是否成功创建
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Failed to create or clone into $TARGET_DIR"
    exit 1
fi

# 如果 wallet-sdk 目录为空，报错并退出
if [ -z "$(ls -A $TARGET_DIR)" ]; then
    echo "Error: $TARGET_DIR is empty. Cloning may have failed."
    exit 1
fi

echo "Contents of $TARGET_DIR:"
ls -la "$TARGET_DIR"

echo "wallet-sdk setup completed successfully."

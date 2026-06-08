#!/usr/bin/env python3
import re, secrets, sys

env_path = sys.argv[1] if len(sys.argv) > 1 else ".env.local"
secret = secrets.token_urlsafe(32)

with open(env_path, "r") as f:
    content = f.read()

content = re.sub(
    r"^NEXTAUTH_SECRET=$",
    "NEXTAUTH_SECRET=" + secret,
    content,
    flags=re.MULTILINE,
)

with open(env_path, "w") as f:
    f.write(content)

print("Generated NEXTAUTH_SECRET")

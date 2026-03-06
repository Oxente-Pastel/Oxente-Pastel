import os

print("Fixing admin.html...")
with open('admin.html', 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_content = admin_content.replace('<script type="module">`nimport', '<script type="module">\nimport')
admin_content = admin_content.replace('`n</script>', '</script>')

with open('admin.html', 'w', encoding='utf-8') as f:
    f.write(admin_content)

print("Fixing index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

with open('js/client.js', 'r', encoding='utf-8') as f:
    client_js = f.read()

replacement = '<script type="module">\n' + client_js + '\n</script>'
index_content = index_content.replace('<script type="module" src="inject.js"></script>', replacement)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)
print("Done fixing HTML files.")

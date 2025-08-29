import os

folder = os.path.dirname(__file__)
for filename in os.listdir(folder):
    if filename.endswith(".txt"):
        txt_path = os.path.join(folder, filename)
        html_path = os.path.join(folder, filename.replace(".txt", ".html"))
        with open(txt_path, "r", encoding="utf-8") as f:
            text = f.read()
        html_content = f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>{filename.replace('.txt', '')} — Privacy Policy</title>
    <style>body{{font-family:Arial,sans-serif;background:#f4f4f4;}}.container{{max-width:800px;margin:40px auto;padding:30px;background:white;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);}}pre{{white-space:pre-wrap;font-size:1.1rem;}}</style>
</head>
<body><div class=\"container\"><pre>{text}</pre></div></body>
</html>"""
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
print("Конвертация завершена!")

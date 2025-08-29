import os
from fpdf import FPDF

print("Скрипт запущен")

font_path = "DejaVuSans.ttf"  # Файл шрифта должен лежать в этой же папке

for filename in os.listdir('.'):
    if filename.endswith('.txt'):
        print(f"Конвертация файла: {filename}")
        pdf = FPDF()
        pdf.add_page()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_font("DejaVu", "", font_path, uni=True)
        pdf.set_font("DejaVu", size=12)
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                # Разбиваем длинные строки на части по 90 символов
                for part in [line[i:i+90] for i in range(0, len(line), 90)]:
                    pdf.cell(0, 10, txt=part.strip(), ln=1)
        pdf_filename = filename.replace('.txt', '.pdf')
        pdf.output(pdf_filename)
        print(f"Создан файл: {pdf_filename}")

print("Конвертация завершена")
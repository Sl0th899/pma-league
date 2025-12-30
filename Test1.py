
# PMA | Round 1 

import tkinter as tk
from tkinter import ttk

# -----------------------------
# Data
# -----------------------------

track_info = """Round 1 – Australia GP | PMA

Pole Position: Stefan
Race Winner: HX4P1
Fastest Lap: HX4P1

Lap Events:
Lap 1 - Aniestube BMW - Inters to Softs
Lap 2 - Vozzy - Crash (1 out of 5)
Lap 11 - GGGF - Crash (2 out of 5)

The other 3 drivers crashed after the first round of pitstops.
"""

race_results = """P1. Happi
P2. Stefan
P3. Ky
P4. LAX
P5. DRXP
P6. Tristan
P7. KsDoom
P8. Chop/sticks
P9. Sport_Beast
P10. Teit
P11. GEME (DNF)
P12. Triple (DNF)
P13. Ethan (DNF)
P14. GGGF (DNF)
P15. Vozzy (DNF)
"""

quali_results = """P1. Stefan - 1:20.722
P2. Trip - 1:23.882
P3. Thec - 1:24.365
P4. Ecto - 1:25.737
P5. Geme - 1:26.203
P6. KsDoom - 1:26.276
P7. Ethan - 1:26.328
P8. Anie - 1:26.562
P9. Notu - 1:26.893
P10. Bray - 1:27.843
P11. Sport_beast - 1:28.330
P12. GGGF - 1:32.071
P13. JAJC
P14. VOZZ
P15. HAPPI
P16. Tristan
"""

tyre_strategies = """Notu - Mediums → Lap 14 Hards
Hx4pi - Mediums → Lap 16 Softs → Lap 23 Softs
Stefan - Softs → Lap 12 Hards
Thec - Softs → Lap 11 Mediums
Bray - Softs → Lap 13 Mediums
Tristan - Softs → Lap 12 Hards
KSDooms - Mediums → Lap 19 Softs
Geme - Softs → Lap 12 Mediums
SportBeast - Softs → Lap 16 Mediums
JAJC - Hards → Lap 23 Softs
Ethan - Softs → Lap 11 Hards (Crashed)
Triple - Softs → Lap 8 Hards (Crashed)
Anie - Inters → Lap 1 Softs
GGGF - Mediums (Crashed)
Vozzy - Mediums (Crashed)
"""

# -----------------------------
# UI Setup
# -----------------------------

root = tk.Tk()
root.title("Formula Apex – Round 1 Interface")
root.geometry("700x500")

notebook = ttk.Notebook(root)
notebook.pack(expand=True, fill="both")

def create_tab(title, content):
    frame = ttk.Frame(notebook)
    notebook.add(frame, text=title)

    text = tk.Text(frame, wrap="word", font=("Consolas", 11))
    text.insert("1.0", content)
    text.config(state="disabled")
    text.pack(expand=True, fill="both", padx=10, pady=10)

# -----------------------------
# Tabs
# -----------------------------

create_tab("Race Result", race_results)
create_tab("Quali Result", quali_results)
create_tab("Tyre Strategy", tyre_strategies)
create_tab("Track", track_info)

root.mainloop()

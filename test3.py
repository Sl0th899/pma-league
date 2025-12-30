import tkinter as tk
from tkinter import ttk
from tkinter import font as tkfont

class RaceDashboard(tk.Tk):
    def __init__(self):
        super().__init__()

        # --- Window Setup ---
        self.title("PMA League | Round 1 - Australia GP")
        self.geometry("900x600")
        self.configure(bg="#1e1e1e") # Dark background

        # --- Styles (Dark Mode) ---
        style = ttk.Style()
        style.theme_use("clam")
        
        # Colors
        self.colors = {
            "bg": "#1e1e1e",
            "fg": "#ffffff",
            "accent": "#e10600", # F1 Red
            "panel": "#2d2d2d",
            "soft": "#ff3b30",
            "medium": "#ffcc00",
            "hard": "#f0f0f0",
            "inter": "#34c759",
            "wet": "#007aff"
        }

        # Configure TTK Styles to match dark theme
        style.configure("TFrame", background=self.colors["bg"])
        style.configure("TLabel", background=self.colors["bg"], foreground=self.colors["fg"], font=("Helvetica", 11))
        style.configure("Header.TLabel", font=("Helvetica", 20, "bold"), foreground=self.colors["fg"])
        style.configure("Sub.TLabel", font=("Helvetica", 14, "bold"), foreground=self.colors["accent"])
        
        style.configure("TNotebook", background=self.colors["bg"], borderwidth=0)
        style.configure("TNotebook.Tab", background=self.colors["panel"], foreground="lightgrey", padding=[15, 5])
        style.map("TNotebook.Tab", background=[("selected", self.colors["accent"])], foreground=[("selected", "white")])

        style.configure("Treeview", 
                        background=self.colors["panel"], 
                        foreground="white", 
                        fieldbackground=self.colors["panel"],
                        rowheight=25,
                        borderwidth=0)
        style.configure("Treeview.Heading", background="#444", foreground="white", font=("Helvetica", 10, "bold"))
        style.map("Treeview", background=[("selected", self.colors["accent"])])

        # --- Header Section ---
        header_frame = ttk.Frame(self)
        header_frame.pack(fill="x", padx=20, pady=20)
        
        lbl_gp = ttk.Label(header_frame, text="ROUND 1 - AUSTRALIA GP", style="Header.TLabel")
        lbl_gp.pack(side="left")
        
        lbl_league = ttk.Label(header_frame, text="PMA LEAGUE", style="Sub.TLabel")
        lbl_league.pack(side="right")

        # --- Main Tabs ---
        self.notebook = ttk.Notebook(self)
        self.notebook.pack(expand=True, fill="both", padx=10, pady=10)

        self.create_race_tab()
        self.create_quali_tab()
        self.create_strategy_tab()
        self.create_summary_tab()

    def create_race_tab(self):
        frame = ttk.Frame(self.notebook)
        self.notebook.add(frame, text="  Race Results  ")

        # Define Columns
        columns = ("pos", "driver", "status")
        tree = ttk.Treeview(frame, columns=columns, show="headings", height=15)
        
        tree.heading("pos", text="Pos")
        tree.heading("driver", text="Driver")
        tree.heading("status", text="Status/Points")
        
        tree.column("pos", width=50, anchor="center")
        tree.column("driver", width=200)
        tree.column("status", width=150, anchor="center")

        # Data
        race_data = [
            ("1", "Happi", "Winner"),
            ("2", "Stefan", "+ Gap"),
            ("3", "Ky", "+ Gap"),
            ("4", "LAX", "Finished"),
            ("5", "DRXP", "Finished"),
            ("6", "Tristan", "Finished"),
            ("7", "KsDoom", "Finished"),
            ("8", "Chop/sticks", "Finished"),
            ("9", "Sport_Beast", "Finished"),
            ("10", "Teit", "Finished"),
            ("11", "GEME", "DNF"),
            ("12", "Triple", "DNF"),
            ("13", "Ethan", "DNF"),
            ("14", "GGGF", "DNF"),
            ("15", "Vozzy", "DNF")
        ]

        # Insert Data with Tags
        for item in race_data:
            tags = ()
            if item[0] == "1": tags = ("p1",)
            elif item[0] == "2": tags = ("p2",)
            elif item[0] == "3": tags = ("p3",)
            elif item[2] == "DNF": tags = ("dnf",)
            
            tree.insert("", "end", values=item, tags=tags)

        # Tag Colors
        tree.tag_configure("p1", foreground="#FFD700", font=("Helvetica", 11, "bold")) # Gold
        tree.tag_configure("p2", foreground="#C0C0C0") # Silver
        tree.tag_configure("p3", foreground="#CD7F32") # Bronze
        tree.tag_configure("dnf", foreground="#ff4d4d") # Red

        tree.pack(fill="both", expand=True, padx=10, pady=10)

    def create_quali_tab(self):
        frame = ttk.Frame(self.notebook)
        self.notebook.add(frame, text="  Qualifying  ")

        columns = ("pos", "driver", "time")
        tree = ttk.Treeview(frame, columns=columns, show="headings")
        
        tree.heading("pos", text="Pos")
        tree.heading("driver", text="Driver")
        tree.heading("time", text="Lap Time")
        
        tree.column("pos", width=50, anchor="center")
        tree.column("driver", width=200)
        tree.column("time", width=150, anchor="e")

        quali_data = [
            ("1", "Stefan", "1:20.722"), ("2", "Trip", "1:23.882"), ("3", "Thec", "1:24.365"),
            ("4", "Ecto", "1:25.737"), ("5", "Geme", "1:26.203"), ("6", "KsDoom", "1:26.276"),
            ("7", "Ethan", "1:26.328"), ("8", "Anie", "1:26.562"), ("9", "Notu", "1:26.893"),
            ("10", "Bray", "1:27.843"), ("11", "Sport_beast", "1:28.330"), ("12", "GGGf", "1:32.071"),
            ("13", "JAJC", "No Time"), ("14", "VOZZ", "No Time"), ("15", "HAPPI", "No Time"), ("16", "tristan", "No Time")
        ]

        for item in quali_data:
            tag = ("pole",) if item[0] == "1" else ()
            tree.insert("", "end", values=item, tags=tag)

        tree.tag_configure("pole", foreground="#a679e0", font=("Helvetica", 11, "bold")) # Purple for pole
        tree.pack(fill="both", expand=True, padx=10, pady=10)

    def create_strategy_tab(self):
        frame = ttk.Frame(self.notebook)
        self.notebook.add(frame, text="  Tyre Strategy  ")

        # Scrollable Canvas
        canvas = tk.Canvas(frame, bg=self.colors["panel"], highlightthickness=0)
        scrollbar = ttk.Scrollbar(frame, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas, style="TFrame")

        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )

        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        # Legend
        legend_frame = ttk.Frame(frame)
        legend_frame.pack(side="top", fill="x", padx=10, pady=5)
        self.create_tyre_dot(legend_frame, "Soft", self.colors["soft"])
        self.create_tyre_dot(legend_frame, "Medium", self.colors["medium"])
        self.create_tyre_dot(legend_frame, "Hard", self.colors["hard"])
        self.create_tyre_dot(legend_frame, "Inter", self.colors["inter"])

        canvas.pack(side="left", fill="both", expand=True, padx=10, pady=5)
        scrollbar.pack(side="right", fill="y")

        # Parsing raw data
        strategies = [
            ("Notu", ["M", "H"]),
            ("Hx4pi", ["M", "S", "S"]),
            ("Stefan", ["S", "H"]),
            ("Thec", ["S", "M"]),
            ("Bray", ["S", "M"]),
            ("Tristan", ["S", "H"]),
            ("KsDoom", ["M", "S"]),
            ("Geme", ["S", "M"]),
            ("SportBeast", ["S", "M"]),
            ("JAJC", ["H", "S"]),
            ("Ethan", ["S", "H", "CRASH"]),
            ("Triple", ["S", "H", "CRASH"]),
            ("Anie", ["I", "S"]),
            ("GGGF", ["M", "CRASH"]),
            ("Vozzy", ["M", "CRASH"]),
        ]

        r = 0
        for driver, stints in strategies:
            row_frame = ttk.Frame(scrollable_frame)
            row_frame.pack(fill="x", pady=5, padx=5)
            
            lbl = ttk.Label(row_frame, text=f"{driver}", width=15)
            lbl.pack(side="left")
            
            for stint in stints:
                color = "#555"
                text = stint
                if stint == "S": color, text = self.colors["soft"], "Soft"
                elif stint == "M": color, text = self.colors["medium"], "Med"
                elif stint == "H": color, text = self.colors["hard"], "Hard"
                elif stint == "I": color, text = self.colors["inter"], "Inter"
                elif stint == "CRASH": color, text = "#555", "X"

                # Draw tyre box
                lbl_stint = tk.Label(row_frame, text=text, bg=color, fg="black", 
                                     font=("Arial", 8, "bold"), width=6, pady=2)
                lbl_stint.pack(side="left", padx=2)
                
                # Arrow
                if stint != stints[-1]:
                    ttk.Label(row_frame, text="→").pack(side="left", padx=2)

    def create_tyre_dot(self, parent, text, color):
        f = ttk.Frame(parent)
        f.pack(side="left", padx=10)
        lbl_col = tk.Label(f, bg=color, width=2)
        lbl_col.pack(side="left")
        ttk.Label(f, text=f" {text}").pack(side="left")

    def create_summary_tab(self):
        frame = ttk.Frame(self.notebook)
        self.notebook.add(frame, text="  Track & Highlights  ")

        # Split left (Stats) and Right (Track placeholder)
        left_panel = ttk.Frame(frame)
        left_panel.pack(side="left", fill="both", expand=True, padx=20, pady=20)
        
        # Highlights
        ttk.Label(left_panel, text="RACE HIGHLIGHTS", style="Sub.TLabel").pack(anchor="w", pady=(0,10))
        
        stats = [
            ("POLE POSITION", "Stefan (1:20.722)"),
            ("RACE WINNER", "HX4P1"),
            ("FASTEST LAP", "HX4P1"),
            ("DRIVER OF DAY", "HX4P1 (Win + FL)")
        ]

        for title, val in stats:
            box = tk.LabelFrame(left_panel, bg=self.colors["panel"], borderwidth=0)
            box.pack(fill="x", pady=5)
            tk.Label(box, text=title, fg="#888", bg=self.colors["panel"], font=("Arial", 9)).pack(anchor="w", padx=10, pady=(5,0))
            tk.Label(box, text=val, fg="white", bg=self.colors["panel"], font=("Arial", 14, "bold")).pack(anchor="w", padx=10, pady=(0,5))

        # Incidents
        ttk.Label(left_panel, text="INCIDENTS REPORT", style="Sub.TLabel").pack(anchor="w", pady=(20,10))
        
        incidents = [
            "Lap 1 - Aniestube BMW (Inters -> Softs)",
            "Lap 2 - Vozzy Crash (1/5)",
            "Lap 11 - GGGF Crash (2/5)",
            "Other 3 crashed after 1st stops"
        ]
        for inc in incidents:
            ttk.Label(left_panel, text=f"• {inc}").pack(anchor="w", pady=2)

        # Track Map Placeholder
        right_panel = ttk.Frame(frame, style="TFrame")
        right_panel.pack(side="right", fill="both", expand=True, padx=20, pady=20)
        
        # Create a placeholder box for the track map
        canvas = tk.Canvas(right_panel, bg="#111", height=300)
        canvas.pack(fill="x", pady=10)
        
        # Drawing a rough track shape (Abstract)
        canvas.create_text(150, 150, text="[TRACK MAP IMAGE PLACEHOLDER]", fill="white")
        # You can replace this canvas with an actual image using PIL (Pillow) library

if __name__ == "__main__":
    app = RaceDashboard()
    app.mainloop()
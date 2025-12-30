import customtkinter as ctk

# --- Configuration ---
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class RacingApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("PMA | Round 1 Australia GP")
        self.geometry("900x600")

        # Layout: Header + Tabview
        self.header_frame = ctk.CTkFrame(self, fg_color="transparent")
        self.header_frame.pack(pady=10, padx=20, fill="x")

        self.title_label = ctk.CTkLabel(self.header_frame, text="ROUND 1 - AUSTRALIA GP", font=("Arial", 24, "bold"))
        self.title_label.pack(side="left")
        
        self.winner_label = ctk.CTkLabel(self.header_frame, text="WINNER: HX4P1", text_color="#34eb77", font=("Arial", 14, "bold"))
        self.winner_label.pack(side="right")

        # Tabs
        self.tabview = ctk.CTkTabview(self, width=850, height=500)
        self.tabview.pack(padx=20, pady=10)

        self.tab_race = self.tabview.add("Race Result")
        self.tab_quali = self.tabview.add("Qualifying")
        self.tab_strat = self.tabview.add("Tyre Strategy")
        self.tab_track = self.tabview.add("Track & Incidents")

        self.build_race_tab()
        self.build_quali_tab()
        self.build_strat_tab()
        self.build_track_tab()

    def build_race_tab(self):
        # Scrollable frame for results
        scroll = ctk.CTkScrollableFrame(self.tab_race, label_text="Final Classification")
        scroll.pack(fill="both", expand=True)

        data = [
            ("1", "Happi", "Finished"), ("2", "Stefan", "Finished"), ("3", "Ky", "Finished"),
            ("4", "LAX", "Finished"), ("5", "DRXP", "Finished"), ("6", "Tristan", "Finished"),
            ("7", "KsDoom", "Finished"), ("8", "Chop/sticks", "Finished"), ("9", "Sport_Beast", "Finished"),
            ("10", "Teit", "Finished"), ("11", "GEME", "DNF"), ("12", "Triple", "DNF"),
            ("13", "Ethan", "DNF"), ("14", "GGGF", "DNF"), ("15", "Vozzy", "DNF")
        ]

        for pos, driver, status in data:
            row = ctk.CTkFrame(scroll, fg_color="#2b2b2b")
            row.pack(fill="x", pady=2)
            
            color = "white"
            if "DNF" in status: color = "#ff4d4d"
            if pos == "1": color = "#ffd700"
            
            ctk.CTkLabel(row, text=pos, width=30, text_color=color).pack(side="left", padx=10)
            ctk.CTkLabel(row, text=driver, width=200, anchor="w", text_color=color).pack(side="left", padx=10)
            ctk.CTkLabel(row, text=status, text_color="gray").pack(side="right", padx=10)

    def build_quali_tab(self):
        scroll = ctk.CTkScrollableFrame(self.tab_quali, label_text="Qualifying Times")
        scroll.pack(fill="both", expand=True)

        data = [
            ("1", "Stefan", "1:20.722"), ("2", "Trip", "1:23.882"), ("3", "Thec", "1:24.365"),
            ("4", "Ecto", "1:25.737"), ("5", "Geme", "1:26.203"), ("6", "KsDoom", "1:26.276"),
            ("7", "Ethan", "1:26.328"), ("8", "Anie", "1:26.562"), ("9", "Notu", "1:26.893"),
            ("10", "Bray", "1:27.843"), ("11", "Sport_beast", "1:28.330"), ("12", "GGGf", "1:32.071"),
            ("13", "JAJC", "No Time"), ("14", "VOZZ", "No Time"), ("15", "HAPPI", "No Time"), ("16", "tristan", "No Time")
        ]

        for pos, driver, time in data:
            row = ctk.CTkFrame(scroll, fg_color="#2b2b2b")
            row.pack(fill="x", pady=2)
            
            # Highlight Pole
            color = "#3498db" if pos == "1" else "white"

            ctk.CTkLabel(row, text=pos, width=30).pack(side="left", padx=10)
            ctk.CTkLabel(row, text=driver, width=200, anchor="w", text_color=color, font=("Arial", 12, "bold" if pos=="1" else "normal")).pack(side="left", padx=10)
            ctk.CTkLabel(row, text=time).pack(side="right", padx=10)

    def build_strat_tab(self):
        import re
        TIRE_COLORS = {
            "Soft": "#ef4444",    
            "Medium": "#facc15",  
            "Hard": "#e5e7eb",    
            "Inter": "#22c55e",   # bg-green-500
            "Wet": "#3b82f6",     # bg-blue-500
            "Unknown": "#6b7280"  # bg-gray-500
        }

        # Text color to ensure contrast against the tire color
        TEXT_COLORS = {
            "Soft": "white",
            "Medium": "black", 
            "Hard": "black",
            "Inter": "white",
            "Wet": "white",
            "Unknown": "white"
        }

        def get_tire_color(name):
            for key, color in TIRE_COLORS.items():
                if key in name: return color, TEXT_COLORS[key]
            return TIRE_COLORS["Unknown"], TEXT_COLORS["Unknown"]

        # Raw Data
        strategies_raw = [
            "Notu: Mediums > Hards (L14)",
            "Hx4pi: Mediums > Softs (L16) > Softs (L23)",
            "Stefan: Softs > Hards (L12)",
            "Thec: Softs > Mediums (L11)",
            "Bray: Softs > Mediums (L13)",
            "Tristan: Softs > Hards (L12)",
            "KSDooms: Mediums > Softs (L19)",
            "Geme: Softs > Mediums (L12)",
            "SportBeast: Softs > Mediums (L16)",
            "JAJC: Hards > Softs (L23)",
            "Anie: Inters > Softs (L1)"
        ]

        # --- 1. Parse Data to determine Race Distance ---
        parsed_strategies = []
        global_max_lap = 0

        for raw in strategies_raw:
            driver, strats_str = raw.split(":", 1)
            parts = strats_str.split(">")
            
            stints = []
            current_lap = 0
            
            # Process all parts except the last one (which are the pit stops)
            for i, part in enumerate(parts):
                compound = part.strip().split(" ")[0].replace("s", "") # Remove plural 's'
                
                # Try to find (Lxx) for pit lap
                match = re.search(r'\(L(\d+)\)', part)
                
                if match:
                    end_lap = int(match.group(1))
                    stints.append({
                        "compound": compound,
                        "start": current_lap,
                        "end": end_lap,
                        "duration": end_lap - current_lap
                    })
                    current_lap = end_lap
                    if end_lap > global_max_lap: global_max_lap = end_lap
                else:
                    # This is the final stint (goes to end)
                    stints.append({
                        "compound": compound,
                        "start": current_lap,
                        "end": "END", # Placeholder
                        "duration": 0 # Placeholder
                    })

            parsed_strategies.append({"driver": driver, "stints": stints})

        # Estimate Total Race Laps: Max pit lap found + ~20 laps for the final stint
        total_race_laps = global_max_lap + 20 

        # Fix the "END" placeholders now that we have total laps
        for row in parsed_strategies:
            last_stint = row["stints"][-1]
            last_stint["end"] = total_race_laps
            last_stint["duration"] = total_race_laps - last_stint["start"]

        # --- 2. Build UI ---
        
        # Main Scroll Container
        scroll = ctk.CTkScrollableFrame(self.tab_strat, label_text="Strategy Analysis")
        scroll.pack(fill="both", expand=True)

        # Legend
        legend_frame = ctk.CTkFrame(scroll, fg_color="transparent")
        legend_frame.pack(fill="x", pady=(0, 15))
        for tire, color in TIRE_COLORS.items():
            l_item = ctk.CTkFrame(legend_frame, fg_color="transparent")
            l_item.pack(side="left", padx=5)
            dot = ctk.CTkLabel(l_item, text="", width=12, height=12, fg_color=color, corner_radius=6)
            dot.pack(side="left")
            txt = ctk.CTkLabel(l_item, text=tire, font=("Arial", 11), text_color="gray")
            txt.pack(side="left", padx=3)

        # Render Drivers
        for data in parsed_strategies:
            row = ctk.CTkFrame(scroll, fg_color="transparent")
            row.pack(fill="x", pady=4)

            # Driver Name (Fixed Width)
            name_lbl = ctk.CTkLabel(
                row, 
                text=data["driver"], 
                width=100, 
                anchor="e", 
                font=("Roboto Mono", 12, "bold"),
                text_color="#d1d5db"
            )
            name_lbl.pack(side="left", padx=(0, 10))

            # The Track Bar (Container for stints)
            # We use a frame with relative sizing inside to create the bar chart
            track_width = 400 # Base width for calculation reference, fills x though
            bar_container = ctk.CTkFrame(row, height=24, fg_color="#1f2937", corner_radius=4)
            bar_container.pack(side="left", fill="x", expand=True, padx=(0, 5))

            # Create Stint Bars inside the container
            for stint in data["stints"]:
                # Calculate percentages
                start_pct = stint["start"] / total_race_laps
                width_pct = stint["duration"] / total_race_laps
                
                bg_color, txt_color = get_tire_color(stint["compound"])
                
                # Stint Visual
                stint_frame = ctk.CTkFrame(
                    bar_container, 
                    fg_color=bg_color, 
                    corner_radius=0 # Square edges for contiguous look
                )
                # Use place with relx/relwidth to be mathematically precise
                stint_frame.place(relx=start_pct, rely=0, relwidth=width_pct, relheight=1)
                
                # Label inside the bar (only if wide enough)
                if width_pct > 0.15: 
                    stint_lbl = ctk.CTkLabel(
                        stint_frame, 
                        text=f"{stint['compound'][0]} ({stint['duration']})", # e.g. "S (12)"
                        text_color=txt_color,
                        font=("Arial", 10, "bold")
                    )
                    stint_lbl.place(relx=0.5, rely=0.5, anchor="center")
    def build_track_tab(self):
        # Stats and Incidents
        f1 = ctk.CTkFrame(self.tab_track)
        f1.pack(fill="x", pady=10)
        ctk.CTkLabel(f1, text="FASTEST LAP: HX4P1", text_color="#a334e3", font=("Arial", 16, "bold")).pack(pady=10)
        ctk.CTkLabel(f1, text="POLE POSITION: Stefan (1:20.722)", text_color="#3498db").pack(pady=5)

        ctk.CTkLabel(self.tab_track, text="RACE CONTROL LOG", font=("Arial", 14, "bold")).pack(pady=(20, 10))
        
        log_text = """
        Lap 1 - Aniestube BMW - Inters to Softs
        Lap 2 - Vozzy Crash (DNF)
        Lap 11 - GGGF Crash (DNF)
        
        Ethan, Triple, and others crashed after 1st pitstops.
        """
        textbox = ctk.CTkTextbox(self.tab_track, height=150)
        textbox.pack(fill="x", padx=10)
        textbox.insert("0.0", log_text)
        textbox.configure(state="disabled")

if __name__ == "__main__":
    app = RacingApp()
    app.mainloop()
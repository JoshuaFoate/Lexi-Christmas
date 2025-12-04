import os
import subprocess
from pathlib import Path

# Create converted folder
converted_dir = Path("videos_converted")
converted_dir.mkdir(exist_ok=True)

# Video files to convert
video_files = [
    "Christmas_Work.mp4",
    "Christmas_Sick.mp4",
    "Christmas_Period.mp4",
    "Christmas_Freaky.mp4",
    "Christmas_Mad.mp4",
    "Christmas_Sad.mp4",
    "Christmas_Missing.mp4",
    "Christmas_Hungry.mp4",
    "Christmas_Obsessed.mp4",
    "Christmas_Freaky_2.mp4",
    "Christmas_Stubborn.mp4",
    "Christmas_Overwhelmed.mp4"
]

for video in video_files:
    input_path = Path("videos") / video
    output_path = converted_dir / video
    
    if input_path.exists():
        print(f"Converting {video}...")
        
        # FFmpeg command for web-optimized MP4
        cmd = [
            "ffmpeg",
            "-i", str(input_path),
            "-c:v", "libx264",        # H.264 video codec
            "-profile:v", "high",      # High profile for better compatibility
            "-level", "4.0",           # Level 4.0 for wide compatibility
            "-preset", "medium",       # Balance between speed and quality
            "-crf", "23",              # Good quality (lower = better)
            "-c:a", "aac",             # AAC audio codec
            "-b:a", "128k",            # 128k audio bitrate
            "-movflags", "+faststart", # Web optimized
            "-vf", "scale='min(1280,iw)':-2",  # Max width 1280px
            "-y",                      # Overwrite output
            str(output_path)
        ]
        
        try:
            subprocess.run(cmd, check=True, capture_output=True)
            print(f"✓ Converted {video}")
        except subprocess.CalledProcessError as e:
            print(f"✗ Failed to convert {video}: {e.stderr.decode()}")
    else:
        print(f"✗ File not found: {input_path}")

print("\nConversion complete!")
print(f"Converted videos are in: {converted_dir}")
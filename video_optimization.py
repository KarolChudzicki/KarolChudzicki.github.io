
from pathlib import Path
import subprocess
import imageio_ffmpeg

folder = Path("Videos")
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

for video in folder.glob("*.mp4"):
    if video.stem.endswith(("_optimized", "_fast")):
        continue

    output = video.with_name(video.stem + "_optimized.mp4")

    command = [
        ffmpeg,
        "-i", str(video),
        "-vf", "scale=-2:'min(1080,ih)'",
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-an",
        "-movflags", "+faststart",
        "-y", str(output)
    ]

    print(f"Converting {video.name}...")
    subprocess.run(command, check=True)
    print(f"Finished: {output.name}")

print("All videos optimized!")

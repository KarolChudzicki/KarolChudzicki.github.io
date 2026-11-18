
from pathlib import Path
import subprocess
import imageio_ffmpeg

folder = Path("Videos")
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

for video in folder.glob("*.mp4"):

    # Pomijamy już skompresowane pliki
    if video.stem.endswith("_compressed"):
        continue

    output = video.with_name(
        video.stem + "_compressed.mp4"
    )

    command = [
        ffmpeg,
        "-i", str(video),

        # Maksymalnie 720p, zachowaj proporcje
        "-vf", "scale=w=1280:h=720:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=30",

        # Kompresja
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "28",
        "-pix_fmt", "yuv420p",

        # Bez dźwięku
        "-an",

        # Odtwarzanie przez internet
        "-movflags", "+faststart",

        "-y", str(output)
    ]

    print(f"Compressing {video.name}...")
    subprocess.run(command, check=True)

    original_size = video.stat().st_size / 1024**2
    new_size = output.stat().st_size / 1024**2

    print(f"{original_size:.1f} MB -> {new_size:.1f} MB")

print("Done!")

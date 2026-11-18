from pathlib import Path
import subprocess
import imageio_ffmpeg

video_folder = Path("Videos")

crf = 23
preset = "medium"

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

for video in video_folder.glob("*.mp4"):

    if video.stem.endswith("_web"):
        continue

    output = video.with_name(video.stem + "_web.mp4")

    print(f"Converting: {video.name}")

    command = [
        ffmpeg,
        "-i", str(video),
        "-c:v", "libx264",
        "-preset", preset,
        "-crf", str(crf),
        "-pix_fmt", "yuv420p",
        "-an",
        "-movflags", "+faststart",
        "-y",
        str(output)
    ]

    subprocess.run(command, check=True)

    print(f"Finished: {output.name}")

print("All videos converted!")

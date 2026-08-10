import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function PhotosSection() {
  const photos = DATA.photos;
  const findPhoto = (src: string) => photos.find((photo) => photo.src === src);
  const featuredPhoto = findPhoto("/about/collage/04-convocation.png");
  const collagePhotos = [
    {
      photo: findPhoto("/about/collage/06-graduation-portrait.png"),
      className: "col-start-1 row-start-1",
      imageClassName: "object-[50%_35%]",
    },
    {
      photo: findPhoto("/about/collage/01-diving.png"),
      className: "col-start-2 row-span-2",
      imageClassName: "object-center",
    },
    {
      photo: findPhoto("/about/collage/02-childhood.png"),
      className: "col-start-3 row-start-1",
      imageClassName: "object-center",
    },
    {
      photo: findPhoto("/about/collage/03-football.png"),
      className: "col-start-1 row-start-2",
      imageClassName: "object-center",
    },
    {
      photo: findPhoto("/about/collage/05-hiking.png"),
      className: "col-start-3 row-start-2",
      imageClassName: "object-center",
    },
  ].filter((item): item is {
    photo: NonNullable<typeof item.photo>;
    className: string;
    imageClassName: string;
  } => Boolean(item.photo));

  return (
    <section id="photos">
      <div className="flex min-h-0 flex-col gap-y-2.5 sm:gap-y-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-xs font-medium sm:text-sm">Gallery</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-2 items-center justify-center sm:gap-y-3">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">{DATA.sections.photos.heading}</h2>
        </div>
        {featuredPhoto && (
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <img
              src={featuredPhoto.src}
              alt={featuredPhoto.alt}
              className="w-full rounded-lg object-cover object-bottom aspect-[16/7] sm:rounded-xl"
            />
          </BlurFade>
        )}
        <div className="grid h-[14rem] grid-cols-3 grid-rows-2 gap-1.5 sm:h-[28rem] sm:gap-2">
          {collagePhotos.map(({ photo, className, imageClassName }, idx) => (
            <BlurFade
              key={photo.src}
              delay={BLUR_FADE_DELAY * 15 + idx * 0.05}
              className={className}
            >
              <div className="h-full w-full">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`h-full w-full rounded-lg object-cover sm:rounded-xl ${imageClassName}`}
                />
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

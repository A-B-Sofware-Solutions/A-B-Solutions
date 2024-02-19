import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CompanyCarousel() {
  return (
    <div className="flex flex-col justify-center mt-32 gap-8">
      <h2 className="text-3xl font-bold text-center px-2">
        Associated with companies like
      </h2>

      <Carousel
        className="w-full max-w-md mx-auto"
        opts={{
          align: 'start',
          loop: true,
          active: true,
        }}
      >
        <CarouselContent className="-ml-4 h-[200px]" aria-label="Companies">
          {Array.from({ length: 10 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="pl-4 flex aspect-square items-center justify-center p-6"
            >
              <img
                src={`/images/companies/${
                  i % 3 === 0
                    ? 'itgix.jpeg'
                    : i % 3 === 1
                    ? 'haemimont.jpeg'
                    : 'trading212.png'
                }`}
                alt="Company"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default function Home() {
  const carousel = ["About", "Process", "Projects", "Case Studies"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-screen">
      <div className="pointer-events-none fixed inset-0 z-50 flex h-full w-full p-10">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between">

            {/* Header */}
            <div className="flex flex-col">
              <h1 className="font-heading text-h4 text-text-primary">
                tayshaun
              </h1>
              <p className="font-heading text-h5 text-text-caption">
                ( developer / designer )
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col items-end gap-2 text-right">
              <a
                className="pointer-events-auto font-heading text-h5 text-text-primary"
                href="mailto:tayshaunds25@gmail.com"
              >
                [email]
              </a>
              <a
                className="pointer-events-auto font-heading text-h5 text-text-primary"
                href="https://www.linkedin.com/in/tayshaunds/"
                target="_blank"
                rel="noreferrer"
              >
                [linkedin]
              </a>
              <a
                className="pointer-events-auto font-heading text-h5 text-text-primary"
                href="https://github.com/tayds25"
                target="_blank"
                rel="noreferrer"
              >
                [github]
              </a>
            </div>
          </div>

          <div className="flex items-end">
            <div className="flex items-end gap-2">
              {carousel.map((item, index) => (
                <div
                  key={item}
                  className={`w-2 rounded-full transition-[height] duration-300 ease-out ${
                    index === 0 ? "h-8 bg-text-primary" : "h-4 bg-text-caption"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-37.5 -translate-y-56.25 rotate-12">
        <div className="flex gap-8 overflow-visible">
          {carousel.map((item) => (
            <div
              key={item}
              className="h-112.5 w-75 shrink-0 bg-ds-accent/20"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
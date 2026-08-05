import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, MapPin, Ticket, Calendar, CheckCircle2, Store, Phone } from "lucide-react";

export const revalidate = 60;

export default async function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = await prisma.destination.findUnique({
    where: { slug: params.slug },
    include: { 
      images: { orderBy: { order: "asc" } },
      umkms: { orderBy: { createdAt: "desc" } }
    },
  });

  if (!destination) {
    notFound();
  }

  let facilities: string[] = [];
  try {
    facilities = JSON.parse(destination.facilities);
  } catch {
    facilities = [destination.facilities];
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <ImageWithFallback
          src={destination.images[0]?.url}
          alt={destination.name}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md">
            <Link href="/wisata">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
          <div className="container mx-auto">
            <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4">
              {destination.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 drop-shadow-lg">
              {destination.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
              {destination.shortDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
              <h2 className="text-2xl font-serif font-bold text-primary-dark mb-6">Tentang Destinasi</h2>
              {destination.description.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-6">Fasilitas Tersedia</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {facilities.map((fac, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium">{fac}</span>
                </div>
              ))}
            </div>

            {destination.umkms && destination.umkms.length > 0 && (
              <>
                <h2 className="text-2xl font-serif font-bold text-primary-dark mb-6 mt-12">Tersedia di Sekitar Sini</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {destination.umkms.map((umkm) => (
                    <div key={umkm.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                      {umkm.imageUrl && (
                        <div className="relative h-32 w-full bg-muted">
                          <ImageWithFallback src={umkm.imageUrl} alt={umkm.name} fill />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-foreground leading-tight">{umkm.name}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full shrink-0 ml-2">{umkm.category}</span>
                        </div>
                        <p className="text-sm text-primary-dark font-medium mb-2 flex items-center gap-1">
                          <Store className="w-3.5 h-3.5" /> {umkm.ownerName}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                          {umkm.description}
                        </p>
                        {umkm.whatsapp ? (
                          <Button asChild size="sm" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                            <a href={`https://wa.me/${umkm.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                              <Phone className="w-3.5 h-3.5 mr-2" /> Pesan
                            </a>
                          </Button>
                        ) : (
                          <Button variant="secondary" size="sm" className="w-full" disabled>Tersedia di Lokasi</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <Card className="border-0 shadow-lg bg-primary-light/30">
                <CardContent className="p-6 space-y-6">
                  {destination.location && (
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white rounded-full text-primary shrink-0 shadow-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Lokasi</h4>
                        <p className="text-muted-foreground">{destination.location}</p>
                      </div>
                    </div>
                  )}
                  {destination.openingHours && (
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white rounded-full text-primary shrink-0 shadow-sm">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Jam Operasional</h4>
                        <p className="text-muted-foreground">{destination.openingHours}</p>
                      </div>
                    </div>
                  )}
                  {destination.ticketPrice && (
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white rounded-full text-primary shrink-0 shadow-sm">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Harga Tiket</h4>
                        <p className="text-muted-foreground">{destination.ticketPrice}</p>
                      </div>
                    </div>
                  )}
                  {destination.bestTimeToVisit && (
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white rounded-full text-primary shrink-0 shadow-sm">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Waktu Terbaik</h4>
                        <p className="text-muted-foreground">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Mini Gallery */}
              {destination.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {destination.images.slice(1).map((img) => (
                    <div key={img.id} className="relative h-32 rounded-xl overflow-hidden shadow-sm">
                      <ImageWithFallback src={img.url} alt={img.alt || destination.name} fill />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

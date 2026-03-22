import { DbRealtor, DbUser } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Building2 } from 'lucide-react';

interface RealtorCardProps {
  realtor: DbRealtor;
  user: DbUser;
}

export default function RealtorCard({ realtor, user }: RealtorCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        {realtor.photo_url ? (
          <img
            src={realtor.photo_url}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
            {user.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{user.name}</p>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Building2 className="h-3.5 w-3.5" />
            <span>{realtor.agency}</span>
          </div>
        </div>
      </div>

      {/* Cities */}
      {realtor.cities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {realtor.cities.slice(0, 4).map(city => (
            <span key={city} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
              <MapPin className="h-3 w-3" />
              {city}
            </span>
          ))}
          {realtor.cities.length > 4 && (
            <span className="text-xs text-gray-400">+{realtor.cities.length - 4} more</span>
          )}
        </div>
      )}

      {/* CTA */}
      <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white mt-auto">
        <a href={`tel:${user.phone ?? '+16478019311'}`} className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          Request Inspection
        </a>
      </Button>
    </div>
  );
}

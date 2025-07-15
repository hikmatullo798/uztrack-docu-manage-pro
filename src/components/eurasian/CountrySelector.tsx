import { useState, useEffect } from "react";
import { Globe, MapPin, Clock, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { countries } from "@/data/mockData";
import { allDocumentRequirements } from "@/data/eurasianData";
import { Country } from "@/types";

interface CountrySelectorProps {
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
  origin?: string;
  destination?: string;
}

export function CountrySelector({ 
  selectedCountries, 
  onCountriesChange, 
  origin, 
  destination 
}: CountrySelectorProps) {
  const [routeCountries, setRouteCountries] = useState<Country[]>([]);
  const [additionalCountries, setAdditionalCountries] = useState<Country[]>([]);

  useEffect(() => {
    // Filter countries based on common routes
    const commonRouteCountries = countries.filter(c => 
      ['UZ', 'KZ', 'RU', 'BY', 'PL', 'DE'].includes(c.code)
    );
    setRouteCountries(commonRouteCountries);
    
    const otherCountries = countries.filter(c => 
      !['UZ', 'KZ', 'RU', 'BY', 'PL', 'DE'].includes(c.code)
    );
    setAdditionalCountries(otherCountries);
  }, []);

  const handleCountryToggle = (countryCode: string, checked: boolean) => {
    let newSelection;
    if (checked) {
      newSelection = [...selectedCountries, countryCode];
    } else {
      newSelection = selectedCountries.filter(c => c !== countryCode);
    }
    onCountriesChange(newSelection);
  };

  const getCountryRequirements = (countryCode: string) => {
    return allDocumentRequirements.filter(req => 
      req.countryCode === countryCode || req.countryCode === 'ALL'
    );
  };

  const getTotalEstimatedCost = () => {
    return selectedCountries.reduce((total, countryCode) => {
      const requirements = getCountryRequirements(countryCode);
      return total + requirements.reduce((countryTotal, req) => countryTotal + req.estimatedCost, 0);
    }, 0);
  };

  const getTotalProcessingTime = () => {
    return selectedCountries.reduce((total, countryCode) => {
      const requirements = getCountryRequirements(countryCode);
      const maxTime = Math.max(...requirements.map(req => req.processingTimeHours), 0);
      return total + maxTime;
    }, 0);
  };

  const getVisaRequiredCountries = () => {
    return selectedCountries.filter(code => {
      const country = countries.find(c => c.code === code);
      return country?.visaRequired;
    });
  };

  const CountryCard = ({ country }: { country: Country }) => {
    const requirements = getCountryRequirements(country.code);
    const mandatoryDocs = requirements.filter(req => req.isMandatory).length;
    const isSelected = selectedCountries.includes(country.code);

    return (
      <div className={`border rounded-lg p-4 transition-all cursor-pointer ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => handleCountryToggle(country.code, checked as boolean)}
              className="mt-1"
            />
            <div>
              <h4 className="font-semibold">{country.nameUz}</h4>
              <p className="text-sm text-muted-foreground">{country.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline">{country.code}</Badge>
            {country.visaRequired && (
              <Badge variant="destructive" className="text-xs">Viza kerak</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span>{country.transitDays} kun</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span>{mandatoryDocs} hujjat</span>
          </div>
        </div>

        {country.requirements.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {country.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {req.replace('_', ' ')}
              </Badge>
            ))}
            {country.requirements.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{country.requirements.length - 3}
              </Badge>
            )}
          </div>
        )}

        {country.additionalInfo && (
          <div className="text-xs text-muted-foreground bg-muted/30 rounded p-2">
            <Info className="w-3 h-3 inline mr-1" />
            {country.additionalInfo}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Davlatlarni tanlash
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Route Information */}
        {(origin || destination) && (
          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              Marshrut: {origin} → {destination}
              <br />
              Mashhur yo'nalishlar asosida davlatlar tavsiya etilgan.
            </AlertDescription>
          </Alert>
        )}

        {/* Popular Route Countries */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Mashhur marshrut davlatlari
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {routeCountries.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        </div>

        {/* Additional Countries */}
        {additionalCountries.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              Qo'shimcha davlatlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {additionalCountries.map((country) => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
          </div>
        )}

        {/* Selection Summary */}
        {selectedCountries.length > 0 && (
          <div className="bg-background/50 border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Tanlangan davlatlar xulosasi</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {selectedCountries.length}
                </div>
                <div className="text-sm text-muted-foreground">Davlatlar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {Math.round(getTotalProcessingTime() / 24)}
                </div>
                <div className="text-sm text-muted-foreground">Kunlar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  ${getTotalEstimatedCost()}
                </div>
                <div className="text-sm text-muted-foreground">Xarajat</div>
              </div>
            </div>

            {/* Visa Warning */}
            {getVisaRequiredCountries().length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Quyidagi davlatlar uchun viza kerak: {' '}
                  {getVisaRequiredCountries().map(code => {
                    const country = countries.find(c => c.code === code);
                    return country?.nameUz;
                  }).join(', ')}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-2">
              {selectedCountries.map(code => {
                const country = countries.find(c => c.code === code);
                return (
                  <Badge key={code} variant="outline" className="gap-1">
                    {country?.nameUz}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => handleCountryToggle(code, false)}
                    >
                      ×
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
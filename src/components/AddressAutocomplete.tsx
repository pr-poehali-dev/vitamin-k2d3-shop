import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddressSuggestion {
  value: string;
  unrestricted_value: string;
  data: {
    postal_code?: string;
    country: string;
    region: string;
    city: string;
    street?: string;
    house?: string;
    flat?: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function AddressAutocomplete({ value, onChange, required }: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ba3d82a9-96db-4f22-9312-bd310ca9d20a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setIsOpen(true);
    } catch (error) {
      console.error('DaData error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) fetchSuggestions(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.value);
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <Label htmlFor="address">
        Адрес доставки {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id="address"
          type="text"
          placeholder="Начните вводить адрес..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-accent text-sm"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
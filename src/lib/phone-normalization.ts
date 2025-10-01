import { parsePhoneNumber, isValidPhoneNumber, PhoneNumber } from 'libphonenumber-js';

export interface PhoneValidationResult {
  isValid: boolean;
  phoneRaw: string;
  phoneE164?: string;
  error?: string;
}

/**
 * Normalize phone number to E.164 format
 * @param phoneRaw - Raw phone number input
 * @param defaultCountry - Default country code (defaults to 'FR')
 * @returns PhoneValidationResult with normalized phone and validation status
 */
export function normalizePhoneNumber(
  phoneRaw: string, 
  defaultCountry: string = 'FR'
): PhoneValidationResult {
  if (!phoneRaw || phoneRaw.trim() === '') {
    return {
      isValid: false,
      phoneRaw: phoneRaw || '',
      error: 'Le numéro de téléphone est requis'
    };
  }

  try {
    // Clean the input
    const cleaned = phoneRaw.trim().replace(/\s+/g, '');
    
    // Try to parse the phone number
    const phoneNumber: PhoneNumber | undefined = parsePhoneNumber(cleaned, defaultCountry as any);
    
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber.number)) {
      return {
        isValid: false,
        phoneRaw,
        error: 'Format de numéro de téléphone invalide'
      };
    }

    return {
      isValid: true,
      phoneRaw,
      phoneE164: phoneNumber.format('E.164')
    };
    
  } catch (error) {
    console.error('Phone normalization error:', error);
    return {
      isValid: false,
      phoneRaw,
      error: 'Impossible de valider le numéro de téléphone'
    };
  }
}

/**
 * Validate and format phone number with French-specific logic
 * @param phoneRaw - Raw phone number input
 * @returns PhoneValidationResult
 */
export function validateFrenchPhone(phoneRaw: string): PhoneValidationResult {
  if (!phoneRaw || phoneRaw.trim() === '') {
    return {
      isValid: false,
      phoneRaw: phoneRaw || '',
      error: 'Le numéro de téléphone est requis'
    };
  }

  // Clean input
  const cleaned = phoneRaw.trim().replace(/[\s.-]/g, '');
  
  // Common French phone patterns
  const frenchPatterns = [
    /^(\+33|0)([1-9])(\d{8})$/, // +33X XXXX XXXX or 0X XX XX XX XX
    /^(\+33|0)([1-9])(\d{2})(\d{2})(\d{2})(\d{2})$/, // +33X XX XX XX XX
  ];

  let normalizedInput = cleaned;
  
  // Handle common French formats
  if (cleaned.match(/^0[1-9]/)) {
    // Convert 0X to +33X
    normalizedInput = '+33' + cleaned.substring(1);
  }

  // Try normalization
  const result = normalizePhoneNumber(normalizedInput, 'FR');
  
  if (result.isValid) {
    return result;
  }

  // Fallback: try with original input
  const fallbackResult = normalizePhoneNumber(cleaned, 'FR');
  
  if (fallbackResult.isValid) {
    return fallbackResult;
  }

  return {
    isValid: false,
    phoneRaw,
    error: 'Format de numéro français invalide (ex: 06 12 34 56 78 ou +33 6 12 34 56 78)'
  };
}

/**
 * Format phone number for display (French format)
 * @param phoneE164 - E.164 formatted phone number
 * @returns Formatted phone number for display
 */
export function formatPhoneForDisplay(phoneE164: string): string {
  try {
    const phoneNumber = parsePhoneNumber(phoneE164);
    if (phoneNumber && phoneNumber.country === 'FR') {
      // Format as 0X XX XX XX XX for French numbers
      return phoneNumber.nationalNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    return phoneNumber?.formatNational() || phoneE164;
  } catch {
    return phoneE164;
  }
}


















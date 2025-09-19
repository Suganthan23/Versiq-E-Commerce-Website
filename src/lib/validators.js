import { z } from 'zod';

export const shippingFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  country: z.string().min(2, { message: "Please select a country." }),
  postalCode: z.string().min(4, { message: "Please enter a valid postal code." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(19, { message: "Card number must be 16 digits." }).max(19),
  cardName: z.string().min(3, { message: "Please enter the name on the card." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/, { message: "Expiry must be in MM/YY format." }),
  cvc: z.string().min(3, { message: "CVC must be 3 or 4 digits." }).max(4),
});
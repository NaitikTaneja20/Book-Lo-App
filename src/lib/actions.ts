'use server';

import { z } from 'zod';
import { addProduct, addBookRequest } from './data';
import { updateSettings } from './settings';
import type { Product, SiteSettings, BookRequest } from './types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ProductSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
  imageId: z.string({ required_error: "Please select an image." }),
  stock: z.coerce.number().int().min(0, { message: "Stock must be a positive integer." }),
  school: z.string().optional(),
  class: z.string().optional(),
  subject: z.string().optional(),
  type: z.enum(['book', 'notebook']),
  isbn: z.string().optional(),
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    imageId?: string[];
    stock?: string[];
    type?: string[];
  };
  message?: string | null;
};


export async function createProductAction(prevState: State, formData: FormData) {
  const validatedFields = ProductSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageId: formData.get('imageId'),
    stock: formData.get('stock'),
    school: formData.get('school'),
    class: formData.get('class'),
    subject: formData.get('subject'),
    type: formData.get('type'),
    isbn: formData.get('isbn'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const newProductData = validatedFields.data as Omit<Product, 'id'>;

  try {
    await addProduct(newProductData);
  } catch (error) {
    return {
        ...prevState,
        message: 'Database Error: Failed to Create Product.' 
    };
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath('/');
  redirect('/admin/products');
}

const SettingsSchema = z.object({
    shippingCost: z.coerce.number().min(0, { message: "Shipping cost must be a positive number." }),
    gstRate: z.coerce.number().min(0).max(1),
    isGstEnabled: z.preprocess((val) => val === 'on', z.boolean()),
});

export type SettingsState = {
  errors?: {
    shippingCost?: string[];
    gstRate?: string[];
    isGstEnabled?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function updateSettingsAction(prevState: SettingsState, formData: FormData): Promise<SettingsState> {
  const validatedFields = SettingsSchema.safeParse({
    shippingCost: formData.get('shippingCost'),
    gstRate: formData.get('gstRate'),
    isGstEnabled: formData.get('isGstEnabled'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data provided.',
      success: false,
    };
  }

  try {
    await updateSettings(validatedFields.data as Partial<SiteSettings>);
  } catch (error) {
    return {
        message: 'Database Error: Failed to update settings.',
        success: false,
    };
  }

  // Revalidate all pages that might use settings
  revalidatePath('/', 'layout');

  return {
    message: 'Settings updated successfully!',
    success: true,
  }
}

const BookRequestSchema = z.object({
  bookTitle: z.string().min(3, { message: "Book title is required." }),
  author: z.string().min(3, { message: "Author is required." }),
  isbn: z.string().optional(),
  customerName: z.string().min(2, { message: "Your name is required." }),
  customerContact: z.string().email({ message: "A valid email is required for contact." }),
});

export type BookRequestState = {
  errors?: {
    bookTitle?: string[];
    author?: string[];
    isbn?: string[];
    customerName?: string[];
    customerContact?: string[];
  };
  message?: string | null;
  success?: boolean;
};


export async function createBookRequestAction(prevState: BookRequestState, formData: FormData): Promise<BookRequestState> {
  const validatedFields = BookRequestSchema.safeParse({
    bookTitle: formData.get('bookTitle'),
    author: formData.get('author'),
    isbn: formData.get('isbn'),
    customerName: formData.get('customerName'),
    customerContact: formData.get('customerContact'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to submit request. Please check the fields.',
      success: false,
    };
  }

  try {
    await addBookRequest(validatedFields.data as Omit<BookRequest, 'id' | 'createdAt' | 'status'>);
  } catch (error) {
    return {
      message: 'Database Error: Failed to submit your request.',
      success: false,
    };
  }

  revalidatePath('/admin/requests');

  return {
    message: 'Your request has been submitted successfully! We will contact you shortly.',
    success: true,
  };
    }

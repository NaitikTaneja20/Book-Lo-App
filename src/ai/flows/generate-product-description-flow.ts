'use server';
/**
 * @fileOverview A Genkit flow for generating product descriptions for books and notebooks.
 *
 * - generateProductDescription - A function that handles the generation of product descriptions.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the book or notebook.'),
  author: z.string().optional().describe('The author of the book (if applicable).'),
  class: z.string().optional().describe('The school class for which the product is prescribed.'),
  subject: z.string().optional().describe('The subject for which the product is prescribed.'),
  isbn: z.string().optional().describe('The ISBN of the book (if applicable).'),
  type: z.enum(['book', 'notebook']).describe('The type of product: book or notebook.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A clear, concise, and engaging product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter for an online bookstore named Book-Lo. Your task is to create a clear, concise, and engaging product description for a {{type}}.

Craft a description that highlights the key features and benefits, and makes the {{type}} appealing to students and parents.

Here are the details:
Title: {{{title}}}
{{#if author}}Author: {{{author}}}{{/if}}
{{#if class}}Class: {{{class}}}{{/if}}
{{#if subject}}Subject: {{{subject}}}{{/if}}
{{#if isbn}}ISBN: {{{isbn}}}{{/if}}

Focus on the type of product (book or notebook) and its relevance to the specified class or subject. Ensure the description is engaging and informative.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

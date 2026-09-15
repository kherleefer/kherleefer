import { supabaseRequest } from "@/lib/supabaseAdmin";

export type StoredCourse = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  currency: string;
  material_path: string;
};

export async function getStoredCourse(id: string) {
  const rows = await supabaseRequest<StoredCourse[]>(
    `/rest/v1/courses?id=eq.${encodeURIComponent(id)}&select=*`,
  );
  return rows[0];
}

export async function getCourseBySlug(slug: string) {
  const rows = await supabaseRequest<StoredCourse[]>(
    `/rest/v1/courses?slug=eq.${encodeURIComponent(slug)}&select=*`,
  );
  return rows[0];
}

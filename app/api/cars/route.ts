import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams;

    const limit = Number(search.get('limit') ?? 12);
    const page = Number(search.get('page') ?? 1);

    const brand = search.get('brand') || undefined;
    const rentalPrice = search.get('rentalPrice') || undefined;
    const minMileage = search.get('minMileage') || undefined;
    const maxMileage = search.get('maxMileage') || undefined;

    const res = await api('/cars', {
      params: {
        limit,
        page,
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
      return NextResponse.json({ error: error.message }, { status: error.response?.status ?? 500 });
    }

    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

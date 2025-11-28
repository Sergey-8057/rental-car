import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    // const search = request.nextUrl.searchParams.get('search') ?? '';
    // const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    // const rawTag = request.nextUrl.searchParams.get('tag') ?? '';
    // const tag = rawTag === 'All' ? '' : rawTag;

    const res = await api('/cars'//, {
      // params: {
      //   ...(search !== '' && { search }),
      //   page,
      //   perPage: 12,
      //   ...(tag && { tag }),
      // },
  //  }
  );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { buildUrl } from '@src/utils';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

async function getWorkSansRegular() {
  const resp = await fetch(buildUrl('/WorkSans-Regular.ttf'));
  return resp.arrayBuffer();
}

async function getWorkSansExtraBold() {
  const resp = await fetch(buildUrl('/WorkSans-ExtraBold.ttf'));
  return resp.arrayBuffer();
}

export default async function (request: Request) {
  const { searchParams } = new URL(request.url);
  const hasTitle = searchParams.has('title');
  const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title';
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <img
            alt="Vercel"
            height={200}
            src="data:image/svg+xml,%3Csvg width='116' height='100' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
            style={{ margin: '0 30px' }}
            width={232}
          />
        </div> */}

        <div
          style={{
            fontSize: 130,
            fontStyle: 'normal',
            fontWeight: 800,
            fontFamily: 'Work Sans',
            letterSpacing: '-0.025em',
            color: '#284052',
            padding: '10px',
            lineHeight: 1.2,
            whiteSpace: 'pre-wrap',
            width: '96%',
            height: '80%',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Work Sans',
          style: 'normal',
          weight: 400,
          data: await getWorkSansRegular(),
        },
        {
          name: 'Work Sans',
          style: 'normal',
          weight: 800,
          data: await getWorkSansExtraBold(),
        },
      ],
    }
  );
}

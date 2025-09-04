export function CommonHeaders() {
    return {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_PORTFOLIO_URL ? process.env.NEXT_PUBLIC_PORTFOLIO_URL : 'http://localhost:3000'
    }
}
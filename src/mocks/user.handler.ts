export const userHandlers = [
  // 내 정보 조회 (프로필, 마이페이지에서 사용)
  /* http.get('/api/myPage', async ({ request }) => {
  const data = {
    email: 'admin@planary.com',
    name: '플랜어리관리자',
    profile_image_url: '/src/assets/default_profile.svg',
    title: '👑관리자👑',
  }

  const token = request.headers.get('Authorization')

  if (token === '12341234') {
    return new HttpResponse(JSON.stringify(data), {
      status: 200,
    })
  } else {
    return new HttpResponse(null, {
      status: 400,
      statusText: 'authentication_failed',
    })
  }
}), */
]

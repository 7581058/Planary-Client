import { http, HttpResponse } from "msw"

const members = []

export const handlers = [
  // 회원가입 API
  http.post("/api/signup", async ({ request }) => {
    const data = await request.json()

    members.push(data)

    return new HttpResponse(null, { status: 201 })
  }),

  // 로그인 API
  http.post("/api/signin", async ({ request }) => {
    const data = {
      accessToken: "12341234",
      refreshToken: "1234",
    }

    const result = await request.json()

    const email = result?.email
    const password = result?.password

    if (email === "admin@planary.com" && password === "1q2w3e4r") {
      return new HttpResponse(JSON.stringify(data), {
        status: 200,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: "authentication_failed",
      })
    }

    //TODO: 회원가입 폼 생성 후 적용
    /* const data = await request.json()

    for (const member of members) {
      if (data.email === member.email && data.password === member.password) {
        return new HttpResponse(null, {
          status: 200,
          headers: {
            "Set-Cookie": `token=1`,
          },
        })
      }
    }

    return new HttpResponse(null, { status: 404 }) */
  }),
]

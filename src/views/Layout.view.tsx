import { html } from 'hono/html'

export const Layout = (props: { title: string, children: any }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>${props.title}</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 p-10">
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        ${props.children}
      </div>
    </body>
  </html>
`
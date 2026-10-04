import { Link } from 'react-router'
import { PageHeader } from '../components/PageHeader'

export function NotFoundPage() {
  return (
    <PageHeader eyebrow="404" title="This page hasn’t been modded in yet">
      <Link to="/" className="font-[480] text-ink underline underline-offset-4 hover:opacity-70">
        Back to the home page
      </Link>
    </PageHeader>
  )
}

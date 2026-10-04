import { PageHeader } from '../components/PageHeader'
import { ResourcesPanel } from '../components/ResourcesPanel'

// Same panel as the nav's Resources menu, given a page of its own.
export function ResourcesPage() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Everything you need to start modding">
        Guides, templates and docs to take you from your first idea to a published mod.
      </PageHeader>
      <section className="px-6 pb-26 md:pb-40">
        <div className="container-l flex justify-center">
          <ResourcesPanel />
        </div>
      </section>
    </>
  )
}

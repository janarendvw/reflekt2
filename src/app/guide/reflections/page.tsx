import React from 'react'
import PageTitle from '../_components/page-title'
import PageContent from '../_components/page-content'

type Props = {}

function Page({}: Props) {
  return (
    <div>
      <PageTitle>Reflections</PageTitle>
      <PageContent>
        <p className='text-muted-foreground'>
          The act of reflecting is a process that involves looking back on what has been done, and considering what
          could have been done differently. It is a way to learn from past experiences, and to improve future
          performance. Reflection can be done in many different ways, and can be used in a variety of contexts. In this
          section, we will explore some of the different ways that reflection can be used, and how it can be applied to
          different situations.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Models</h2>
        <p>
          There are many different models of reflection that can be used to guide the process of reflecting. Some of the
          most common models include:
        </p>
        <ul className="ml-4 mt-4 list-disc">
          <li>
            <a href="/guide/reflections/models/starr">STARR</a>
          </li>
          <li>
            <a href="/guide/reflections/models/Korthagen">Korthagen</a>
          </li>
          <li>
            <a href='moscow'>MoSCoW</a>
          </li>
          <li>
            <a href="/guide/reflections/models/default">Default</a>
          </li>
        </ul>
      </PageContent>
    </div>
  )
}

export default Page

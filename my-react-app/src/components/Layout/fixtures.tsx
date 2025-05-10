import React from 'react'
import NavBar from '../NavBar'
import { navbarFixtures } from '../NavBar/fixtures'

export const layoutFixtures = {
  // NavBar component instance
  navBar: <NavBar routes={navbarFixtures.routes} />,

  // Content examples for different stories
  content: {
    // Simple content for the default layout
    default: <div>Content inside the layout</div>,

    // Content for layout with navbar
    withNavBar: <div>Content inside the layout with navbar above</div>,

    // Long content example to test scrolling
    longContent: (
      <div>
        <h1>Long Content Example</h1>
        <p>
          This is a paragraph of text to demonstrate how the layout handles
          longer content.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    ),
  },
}

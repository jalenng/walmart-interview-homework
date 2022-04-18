import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'

import Profile from './Profile'

import { hover } from '@testing-library/user-event/dist/hover';
import { click } from '@testing-library/user-event/dist/click';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

describe("<Profile />", () => {

  test('Check for user name', async () => {
    render(<Profile id={5}/>);

    // Check for Chelsey's name
    const name = await screen.findByText(/Chelsey/, { timeout: 5000 });
    expect(name).toBeInTheDocument();
  });

  test('Check for user posts', async () => {
    render(<Profile id={5}/>);

    // Expand posts
    const expand = await screen.findByText(/Posts/, { timeout: 5000 });
    await click(expand);
    
    // Ensure that Chelsey's posts are expanded
    const postExpanded = await screen.findByText(/non est facere/, { timeout: 5000 });
    expect(postExpanded).toBeInTheDocument();

    // Search for a post
    const search = await screen.findByPlaceholderText(/Search/, { timeout: 5000 });
    await search.click()
    await keyboard('non est')

    // Ensure that the post is displayed
    const postFound = await screen.findByText(/non est facere/, { timeout: 5000 });
    expect(postFound).toBeInTheDocument();
  });

  
  
});
import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import Users from './Users'
import { hover } from '@testing-library/user-event/dist/hover';
import { click } from '@testing-library/user-event/dist/click';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

describe("<Users />", () => {

  test('List users by name', async () => {
    render(<Users />);

    // Check for Chelsey's name
    const name = await screen.findByText(/Chelsey/, { timeout: 5000 });
    expect(name).toBeInTheDocument();
  });

  test('On hover to show popup', async () => {
    render(<Users />);
    const name = await screen.findByText(/Chelsey/, { timeout: 5000 });
    await hover(name)

    // Check username in popup
    const username = await screen.findByText(/Kamren/, { timeout: 5000 });
    expect(username).toBeInTheDocument();

    // Check email in popup
    const email = await screen.findByText(/Lucio_Hettinger@annie.ca/, { timeout: 5000 });
    expect(email).toBeInTheDocument();
  });

  test('Check search bar', async () => {
    render(<Users />);

    // Input search text
    const search = await screen.findByPlaceholderText(/Search/, { timeout: 5000 });
    await search.click()
    await keyboard('chel')

    // Ensure Chelsey's name is still displayed
    const name = await screen.findByText(/Chelsey/, { timeout: 5000 });
    expect(name).toBeInTheDocument();
  });

});
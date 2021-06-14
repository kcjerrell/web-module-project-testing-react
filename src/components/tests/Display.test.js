///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from '../Display';
import Episode from '../Episode';
import { testShow } from './Show.test';

import fetchShow from '../../api/fetchShow';
import userEvent from '@testing-library/user-event';
jest.mock('../../api/fetchShow');

//2. Test that the Display component renders without any passed in props.
test('renders without error', () => {
	render(<Display />);
})

//3. Rebuild or copy a show test data element as used in the previous set of tests.
//   import { testShow } from './Show.test';

//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api
//   call and change of state in building your test.
test('when fetch button is pressed, the show component displays', async () => {
	render(<Display />);

	const show = screen.queryByTestId("show-container");
	expect(show).toBeNull();

	fetchShow.mockResolvedValueOnce(testShow);

	const fetchButton = screen.getByRole("button");
	expect(fetchButton).toBeInTheDocument();
	expect(fetchButton).toBeVisible();

	userEvent.click(fetchButton);

	await waitFor(() => {
		const show = screen.queryByTestId("show-container");
		expect(show).toBeInTheDocument();
		expect(show).toBeVisible();
	})

	//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of
	//   seasons in your test data.
	const options = screen.getByLabelText(/select a season/i);
	expect(options).toBeInTheDocument();
	expect(options).toBeVisible();
	expect(options.options.length).toEqual(testShow.seasons.length + 1);
});


//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch
//   button is pressed, this function is called.
test("displayFunc callBack is called when fetch show button is clicked", async () => {
	const displayFunc = jest.fn();
	fetchShow.mockResolvedValueOnce(testShow);

	render(<Display displayFunc={displayFunc} />);

	expect(displayFunc.mock.calls.length).toEqual(0);

	const fetchButton = screen.getByRole("button");
	userEvent.click(fetchButton);
	await waitFor(() => {
		const show = screen.queryByTestId("show-container");
		expect(show).toBeInTheDocument();
		expect(show).toBeVisible();
	})

	expect(displayFunc.mock.calls.length).toEqual(1);
});













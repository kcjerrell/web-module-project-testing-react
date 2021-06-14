import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id: 1,
    name: "",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "",
    runtime: 1
}

const testEpisodeWithoutImage = {
    ...testEpisode,
    id: 2,
    image: null,
}

test("our test runner works", () => {
    expect(5).toEqual(2 + 3);
});

//Tasks
//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
test("renders without error", () => {
    render(<Episode episode={testEpisode} />);
});

//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value
//   passed in to the Episode component displays as expected.Use no more then 3 different expect statements to test
//   the the existance of the summary value.
test("renders the summary test passed as prop", async () => {
    const summary = "This is the one with the monster";
    const episode = { ...testEpisode, summary };

    render(<Episode episode={episode} />);

    const element = await screen.findByText(summary);

    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
});

//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided.
//   Create a new piece of test data with the image property set to null.Test that the alt tag of the image displayed
//   is set to './stranger_things.png'.
test("renders default image when image is not defined", () => {
    render(<Episode episode={testEpisodeWithoutImage} />);

    const image = screen.getByAltText('./stranger_things.png');

    expect(image).toBeInTheDocument();
    expect(image).toBeVisible();
});

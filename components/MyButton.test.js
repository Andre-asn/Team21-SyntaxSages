import GenericButton from "./GenericButton";
import { render, fireEvent } from "@testing-library/react-native"
import renderer from "react-test-renderer"

describe("GenericButton", () => {
    it("calls onPress function when button is pressed", () => {
        const mock = jest.fn();
        const { getByTestId } = render(<GenericButton onPress={mock} />)
        const pressMe = getByTestId("GenericButton:ClickMe")
        fireEvent.press(pressMe)

        expect(mock).toHaveBeenCalled()

    
    })

    it("renders properly", () => {
        const tree = renderer.create(<GenericButton />).toJSON()
        expect(tree).toMatchSnapshot
    })
    
})
import { FiFolderPlus } from 'react-icons/fi';

import * as Base from './view/header';

export default function NavHeader() {
  return (
    <Base.Root>
      <Base.Heading as="h1">Collections</Base.Heading>
      <Base.Actions.Root>
        <Base.Actions.Action label="Create a new folder" icon={FiFolderPlus} />
      </Base.Actions.Root>
    </Base.Root>
  );
}

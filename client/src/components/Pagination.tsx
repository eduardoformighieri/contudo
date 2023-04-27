import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';

type PaginationProps = {
  currentPage: number;
  changeCurrentPage: any;
  perPage?: number;
  siblingsPagesCount?: number;
  total: number;
  // ...rest props
  [otherProps: string]: any;
};

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
};

export const Pagination = ({
  currentPage,
  changeCurrentPage,
  perPage = 10,
  siblingsPagesCount = 1,
  total,
  ...rest
}: PaginationProps) => {
  let lastPage = Math.ceil(total / perPage);
  if (lastPage === 0) {
    lastPage = 1;
  }
  const previousPages =
    currentPage > 1
      ? generatePagesArray(
          currentPage - 1 - siblingsPagesCount,
          currentPage - 1
        )
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsPagesCount, lastPage)
        )
      : [];

  const handlePageStep = (number: number) => {
    if (number === 1 && currentPage < lastPage) {
      changeCurrentPage(currentPage + 1);
    }
    if (number === -1 && currentPage > 1) {
      changeCurrentPage(currentPage - 1);
    }
  };

  const renderCurrentPage = () => (
    <Button
      px={3}
      py="2px"
      borderRadius={8}
      key={`current-users-page${currentPage}`}
      size="xs"
      color="black"
      cursor="default">
      {currentPage}
    </Button>
  );

  const renderOtherPages = (page: number) => (
    <Button
      _hover={{ color: 'black', bg: 'gray.100' }}
      variant="ghost"
      px={3}
      py="2px"
      borderRadius={8}
      key={`page ${page}`}
      id={`${page}`}
      size="xs"
      onClick={() => changeCurrentPage(page)}>
      {page}
    </Button>
  );
  return (
    <Flex
      {...rest}
      w="100%"
      alignItems={['flex-start', 'center']}
      justify="space-between"
      flexDirection={['column', 'row']}>
      <Text color="gray.300" fontSize="sm">
        Showing {currentPage === lastPage ? total : currentPage * perPage}{' '}
        result
        {total > 1 ? 's' : null} of {total}
      </Text>

      <HStack
        alignItems="center"
        justify="center"
        alignSelf="center"
        mt={[2, 6]}
        mb={6}
        spacing="4">
        <Flex as="button" onClick={() => handlePageStep(-1)}>
          <ChevronLeftIcon />
        </Flex>
        {currentPage > 1 + siblingsPagesCount && renderOtherPages(1)}
        {currentPage > 2 + siblingsPagesCount && (
          <Text color="gray.300" maxW="6" textAlign="center">
            ...
          </Text>
        )}
        {previousPages?.map((page) => renderOtherPages(page))}
        {renderCurrentPage()}
        {nextPages?.map((page) => renderOtherPages(page))}
        {currentPage + 1 + siblingsPagesCount < lastPage && (
          <Text color="gray.300" maxW="6" textAlign="center">
            ...
          </Text>
        )}
        {currentPage + siblingsPagesCount < lastPage &&
          renderOtherPages(lastPage)}
        <Flex as="button" onClick={() => handlePageStep(1)}>
          <ChevronRightIcon />
        </Flex>
      </HStack>
    </Flex>
  );
};

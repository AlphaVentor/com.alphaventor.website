public static void main(String[] args) throws IOException, JSON_CompilingException {

	JSON_Lexicon context = JSON_Lexicon.from(MyRootType.class);

	String pathname = "data/V2_test_output.js";

	RandomAccessFile file = new RandomAccessFile(new File(pathname), "r");

	try {
		JOOS_BufferedFileReader reader = new JOOS_BufferedFileReader(file.getChannel(), StandardCharsets.UTF_8, 64);

		MyRootType result = (MyRootType) context.parse(reader, true);
		System.out.println(result);
		reader.close();
	} catch (JSON_ParsingException e) {
		e.printStackTrace();
	} finally {

		file.close();
	}
}

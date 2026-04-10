
public static void generateDTD() throws XML_TypeCompilationException, IOException {
	XML_Codebase context = XML_Codebase.from(MyTrain.class);
	Writer writer = new BufferedWriter(
			new OutputStreamWriter(new FileOutputStream(new File("data/xml/input/train.dtd"))));
	context.xsd_writeSchema(writer);
	writer.close();
}

public static void read() throws Exception {

	Reader reader = new BufferedReader(
			new InputStreamReader(new FileInputStream(new File("data/xml/input/test-train.xml"))));
	XML_Codebase context = XML_Codebase.from(MyTrain.class);

	context.setVerbosity(true);
	Object object = context.deserialize(reader);
	reader.close();

	BufferedWriter writer = new BufferedWriter(
			new OutputStreamWriter(new FileOutputStream(new File("data/xml/output/gen-train.xml"))));
	context.serialize(object, writer);
	writer.close();

	System.out.println("done: " + object);
}

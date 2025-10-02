import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, Settings, Palette, Ear, ChevronRight, Sun, Clock, Bell } from 'lucide-react-native';
import { wp } from "../helpers/common";



const Home: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [blueLightFilter, setBlueLightFilter] = useState(false);
    const [activeBreakReminder, setActiveBreakReminder] = useState(true);

    const features = [
        {
            id: 'eye-preferences',
            title: 'Eye Preferences',
            description: 'Customize your visual comfort settings',
            icon: Settings,
            color: '#4F46E5',
            bgColor: '#EEF2FF',
            route: 'EyePreferences',
        },
        {
            id: 'eye-test',
            title: 'Take Eye Test',
            description: 'Test your vision and get personalized recommendations',
            icon: Eye,
            color: '#059669',
            bgColor: '#ECFDF5',
            route: 'SampleEyeTest',
        },
        {
            id: 'color-blindness',
            title: 'Color Blindness Test',
            description: 'Detect color vision deficiencies',
            icon: Palette,
            color: '#DC2626',
            bgColor: '#FEF2F2',
            route: 'ColorBlindnessTest',
        },
        {
            id: 'hearing-test',
            title: 'Hearing Test',
            description: 'Check your hearing and optimize audio settings',
            icon: Ear,
            color: '#D97706',
            bgColor: '#FFFBEB',
            route: 'HearingTest',
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* header */}
                <View style={styles.header}>
                    <View style={styles.container1}>
                        <View style={styles.leftSection}>
                            <View style={styles.logoContainer}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                    accessible
                                    accessibilityLabel="Netra logo"
                                />
                            </View>
                            <View>
                                <Text style={styles.title1}>Netra</Text>
                                <Text style={styles.subtitle1}>See Clearly. Live Fully.</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Bell size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Greeting */}
                <View style={styles.greeting}>
                    <Text style={styles.greetingText}>Welcome back!</Text>
                    <Text style={styles.greetingSubtext}>How can we help you today?</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <View style={styles.grid}>
                        {/* Blue Light Filter */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setBlueLightFilter(!blueLightFilter)}
                            style={[
                                styles.card,
                                blueLightFilter ? styles.activeBlueCard : styles.inactiveCard,
                            ]}
                        >
                            <Sun
                                size={24}
                                color={blueLightFilter ? "#D97706" : "#9CA3AF"} // amber-600 : gray-400
                                strokeWidth={2}
                                style={{ marginBottom: 8 }}
                            />
                            <Text style={styles.cardTitle}>Blue Light Filter</Text>
                            <Text style={styles.cardSubtitle}>
                                {blueLightFilter ? "Active" : "Inactive"}
                            </Text>
                        </TouchableOpacity>

                        {/* Break Reminders */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setActiveBreakReminder(!activeBreakReminder)}
                            style={[
                                styles.card,
                                activeBreakReminder ? styles.activeGreenCard : styles.inactiveCard,
                            ]}
                        >
                            <Clock
                                size={24}
                                color={activeBreakReminder ? "#16A34A" : "#9CA3AF"} // green-600 : gray-400
                                strokeWidth={2}
                                style={{ marginBottom: 8 }}
                            />
                            <Text style={styles.cardTitle}>Break Reminders</Text>
                            <Text style={styles.cardSubtitle}>
                                {activeBreakReminder ? "Every 20 min" : "Paused"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Features */}
                <View style={styles.featuresContainer}>
                    <Text style={styles.sectionTitle}>Vision Tools</Text>
                    {features.map((feature) => (
                        <TouchableOpacity
                            key={feature.id}
                            style={styles.featureCard}
                            onPress={() => navigation.navigate(feature.route as any)}
                            activeOpacity={0.7}>
                            <View style={[styles.iconContainer, { backgroundColor: feature.bgColor }]}>
                                <feature.icon size={28} color={feature.color} strokeWidth={2} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>{feature.description}</Text>
                            </View>
                            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Daily Tip */}
                <View style={styles.tipCard}>
                    <Text style={styles.tipTitle}>Daily Tip</Text>
                    <Text style={styles.tipText}>
                        Remember to follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    logo: {
        width: wp(16),
        height: wp(16),
    },
    header: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6', // gray-100
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2, // for Android shadow
    },
    container1: {
        paddingHorizontal: 24, // px-6
        paddingVertical: 20, // py-5
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12, // gap-3
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:8
    },
    title1: {
        fontSize: 20, // text-2xl
        fontWeight: 'bold',
        color: '#111827', // gray-900
    },
    subtitle1: {
        fontSize: 12, // text-sm
        color: '#6B7280', // gray-500
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
    },
    greeting: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    greetingSubtext: {
        fontSize: 16,
        color: '#6B7280',
    },
    featuresContainer: {
        paddingHorizontal: 20,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    tipCard: {
        marginHorizontal: 20,
        marginTop: 24,
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1D4ED8',
        marginBottom: 8,
    },
    tipText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    container2: {
        marginBottom: 32,
        paddingHorizontal: 16
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280", // gray-500
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 16,
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    card: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: "flex-start",
        transform: [{ scale: 1 }],
    },
    inactiveCard: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB", // gray-200
    },
    activeBlueCard: {
        backgroundColor: "#FFFBEB", // amber-50
        borderColor: "#FCD34D", // amber-300
    },
    activeGreenCard: {
        backgroundColor: "#ECFDF5", // green-50
        borderColor: "#86EFAC", // green-300
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827", // gray-900
    },
    cardSubtitle: {
        fontSize: 12,
        color: "#6B7280", // gray-500
    },
});